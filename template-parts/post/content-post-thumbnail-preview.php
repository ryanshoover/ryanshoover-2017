<?php
/**
 * Template part for displaying a preview of a post as a thumbnail
 */
?>

<section class="post-preview">
	<a href="<?php the_permalink(); ?>">
		<div class="post-thumbnail">
			<?php
				the_post_thumbnail();
			?>
		</div>
		<div class="post-info">
			<?php
				printf( '<h3>%s</h3>', get_the_title() );
			?>
		</div>
	</a>
</section>