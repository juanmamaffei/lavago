class SuscriptionsController < ApplicationController
  before_action :set_suscription, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!

  # GET /suscriptions
  # GET /suscriptions.json
  def index
    @suscriptions = Suscription.all
  end

  # GET /suscriptions/1
  # GET /suscriptions/1.json
  def show
  end

  # GET /suscriptions/new
  def new
    @suscription = Suscription.new
  end

  # GET /suscriptions/1/edit
  def edit
  end

  # POST /suscriptions
  # POST /suscriptions.json
  def create
    @suscription = Suscription.new(suscription_params)

    respond_to do |format|
      if @suscription.save
        format.html { redirect_to @suscription, notice: 'Suscription was successfully created.' }
        format.json { render :show, status: :created, location: @suscription }
      else
        format.html { render :new }
        format.json { render json: @suscription.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /suscriptions/1
  # PATCH/PUT /suscriptions/1.json
  def update
    respond_to do |format|
      if @suscription.update(suscription_params)
        format.html { redirect_to @suscription, notice: 'Suscription was successfully updated.' }
        format.json { render :show, status: :ok, location: @suscription }
      else
        format.html { render :edit }
        format.json { render json: @suscription.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /suscriptions/1
  # DELETE /suscriptions/1.json
  def destroy
    @suscription.destroy
    respond_to do |format|
      format.html { redirect_to suscriptions_url, notice: 'Suscription was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_suscription
      @suscription = Suscription.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def suscription_params
      params.require(:suscription).permit(:user_id, :details)
    end
end
