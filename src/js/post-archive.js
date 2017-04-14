
( function( $ ) {

	/**
	 * A basic view to display the posts
	 */
	var SinglePostView = wp.Backbone.View.extend({

		// Set up our template function: wp.template returns a function.
		template: wp.template( 'post-preview' ),

		className: 'post-preview',

		render: function() {

			// Render this view by passing the model to the template function.
			this.$el.html( this.template( this.model ) );
		}
	});

	/**
	 * PostsCollectionView is a container view that will contain the other views.
	 */
	var PostsCollectionView = wp.Backbone.View.extend({
		className: 'wrap',
	});

	/**
	 * Setup our app for a specific shortocde generated area.
	 *
	 * This function is called for each are visible on the page and
	 * ties the app to that area and its ids.
	 *
	 * @param  String area The selection target of the area to tie the app to.
	 */
	function setupApp( area ) {

		// Get the area data
		var $area = $( area ),
			data = $area.data();

		// Set up a new collection view to contain the posts.
		var collectionView = new PostsCollectionView();

		// Get the posts from the api using the JS client.
		var posts = new wp.api.collections.Posts();

		// Fetch the posts, returning a promise.
		var promise = posts.fetch({
			'data': {
				'categories': data.category,
				'_embed': true // Embed all the post details including media.
			}
		});

		// Continue when the fetch completes.
		promise.complete( function() {

			// Loop thru the posts, creating and adding views.
			_.each( posts.models, function( post ) {

				// Create a new view from the post.
				var singlePost = new SinglePostView( { 'model': post } );

				// Add the view to our container view.
				collectionView.views.add( singlePost );
			} );

			// Render the collectionView.
			collectionView.render();

			// Insert the collectionView into the DOM.
			$( '.post-archive[data-id="' + data.id + '"]' ).html( collectionView.el );
		} );
	}

	/**
	 * When the page is loaded, set up our app.
	 */
	$( document ).ready( function() {

		if ( ! wp.api || false ) {
			return;
		}

		// Wait for the client to load.
		wp.api.loadPromise.done( function() {

			// Loop thru each shortcode area.
			_.each( $( '.post-archive' ), function( area ) {
				setupApp( area );
			} );
		} )
	} );

} )( jQuery );
