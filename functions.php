<?php
/**
 * Functions for Ryan Hoover Child
 */

namespace RSH;

define( 'RSH_PATH', get_stylesheet_directory() );
define( 'RSH_URL', get_stylesheet_directory_uri() );

function enqueue_styles() {

    $parent_style = 'twentyseventeen';
    $parent_theme = wp_get_theme( $parent_style );

    $css_parent_version = $parent_theme->get('Version');
    $css_child_version  = filemtime( RSH_PATH . '/dist/style.css' );
    $js_child_version   = filemtime( RSH_PATH . '/dist/scripts.js' );

    wp_enqueue_style( $parent_style, get_template_directory_uri() . '/style.css', [], $css_parent_version );
    wp_enqueue_style( 'child-style', RSH_URL . '/dist/style.css', [ $parent_style ], $css_child_version );

    wp_enqueue_script( 'child-scripts', RSH_URL . '/dist/scripts.js', [ 'wp-backbone', 'wp-api' ], $js_child_version, true );
}

add_action( 'wp_enqueue_scripts', '\RSH\enqueue_styles' );

function shortcode_posts_grid( $atts ) {
	add_action( 'wp_print_footer_scripts', '\RSH\posts_grid_backbone_templates' );

	$atts = wp_parse_args( $atts, [ 'cat' => null ] );

	$template = '<div class="post-archive" data-category="%s" data-id="%s"></div>';

	$html = sprintf( $template, esc_attr( $atts['cat'] ), esc_attr( rand() ) );

	return $html;
}

add_shortcode( 'posts_grid', '\RSH\shortcode_posts_grid' );

/**
 * Add the app templates to the site footer.
 */
function posts_grid_backbone_templates( ) {
	?>
<script type="text/html" id="tmpl-post-preview">
	<section class="post-preview">
		<a href="<?php the_permalink(); ?>" class="wrap">
			<div class="post-thumbnail">
				<img src="{{ data.attributes._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url }}">
			</div>
			<div class="post-info">
				<h3>{{ data.attributes.title.rendered }}</h3>
			</div>
		</a>
	</section>
</script>
	<?php
}



/**
$query_args = [ 'category__in' => $atts['cat'] ];

$template_posts = new \WP_Query( $query_args );

ob_start();

while ( $template_posts->have_posts() ) : $template_posts->the_post();

	get_template_part( 'template-parts/post/content-post', 'thumbnail-preview' );

endwhile; // End of the loop.

$html .= ob_get_clean();


