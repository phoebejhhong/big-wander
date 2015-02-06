class Api::SearchesController < ApplicationController
  def show
    @galleries = Gallery.search(params[:id])
    @pano_items = PanoItem.search(params[:id])
    render :index
  end
end
