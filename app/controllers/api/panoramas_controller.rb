class Api::PanoramasController < ApplicationController

  def index
    panoramas = Panorama.all
    render json: panoramas
  end

  def show
    panorama = Panorama.find(params[:id])
    render json: panorama
  end

end
