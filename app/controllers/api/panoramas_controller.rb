module Api
  class PanoramasController < ApiController

    def index
      panoramas = Panorama.all
      render json: panoramas
    end

    def show
      panorama = Panorama.find(params[:id])
      render json: panorama
    end

  end
end
