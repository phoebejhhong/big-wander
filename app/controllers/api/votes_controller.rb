class Api::VotesController < ApplicationController

  def create
    vote = Vote.new(vote_params)
    if vote.save
      render json: vote
    else
      render json: vote.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    vote = Vote.find(params[:id])
    vote.destroy
    render nothing: true
  end

  private
  def vote_params
    params.require(:vote).permit(:voter_id, :pano_item_id)
  end
end
