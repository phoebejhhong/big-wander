class Api::PanoramasController < ApplicationController

  def index
    panoramas = Panorama.all
    render json: panoramas
  end

  def show
    panorama = Panorama.find(params[:id])
    render json: panorama
  end

  def create
    params = panorama_params
    params[:heading] ||= 0
    params[:pitch] ||= 0
    panorama = Panorama.new(params)
    if panorama.save()
      render json: panorama
    else
      render json: panorama.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
  def panorama_params
    params.require(:panorama).permit(:lat, :lng, :heading, :pitch)
  end

end
