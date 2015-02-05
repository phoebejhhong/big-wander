class Api::GalleriesController < ApplicationController

  def show
    @gallery = Gallery.find(params[:id])
    render :show
  end

  def create
    gallery = Gallery.new(pano_item_params)
    if gallery.save
      render json: gallery
    else
      render json: gallery.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy

  end

end
