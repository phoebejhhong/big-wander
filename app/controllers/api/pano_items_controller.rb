class Api::PanoItemsController < ApplicationController

  def create
    pano_item = PanoItem.new(pano_item_params)
    if pano_item.save
      render json: pano_item
    else
      render json: pano_item.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    pano_item = PanoItem.find(params[:id])
    pano_item.destroy
    render nothing: true
  end

  private
  def pano_item_params
    params.require(:pano_item).permit(:gallery_id, :title,
      :lat, :lng, :heading, :pitch)
  end
end
