class Api::PanoItemsController < ApplicationController

  def index
    if params[:query]
      @pano_items = PanoItem.popular.search(params[:query])
      render :index
    elsif params[:popular]
      @pano_items = PanoItem.popular.page(params[:page]).per(params[:popular])
      render :paginated_index
    else
      @pano_items = PanoItem.all
      render :index
    end
  end

  def create
    pano_item = PanoItem.new(pano_item_params)
    pano_item.all_tags = params[:all_tags]
    if pano_item.save
      render json: pano_item
    else
      render json: pano_item.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    pano_item = PanoItem.find(params[:id])
    pano_item.all_tags = params[:all_tags]
    if pano_item.update_attributes(pano_item_params)
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
