class Api::GalleriesController < ApplicationController

  def index
    @galleries = Gallery.search(params[:search])
    render :index
  end

  def show
    @gallery = Gallery.find(params[:id])
    render :show
  end

  def create
    gallery = Gallery.new(gallery_params)
    if gallery.save
      render json: gallery
    else
      render json: gallery.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    gallery = Gallery.find(params[:id])
    if gallery.update_attributes(gallery_params)
      render json: gallery
    else
      render json: gallery.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    gallery = Gallery.find(params[:id])
    gallery.destroy
    render nothing: true
  end

  private

  def gallery_params
    params.require(:gallery).permit(:owner_id, :title, :description)
  end

end
