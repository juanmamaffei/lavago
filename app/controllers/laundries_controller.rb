class LaundriesController < ApplicationController
  before_action :set_laundry, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, except: :show

  # antes de guardar que busque las coordenadas acá
  # https://maps.googleapis.com/maps/api/geocode/json?address=#{VARIABLECONLOQUEPUSOELUSER+,ROSARIO}&key=AIzaSyAP9BJ5wfeQ23i_gVQe0tbczeHcIcKNLWQ
  # o este otro que es open source
  # https://nominatim.openstreetmap.org/search?q=#{VARIABLECONLOQUEPUSOELUSER+,ROSARIO}&format=json
  
  # GET /laundries
  # GET /laundries.json
  def index
    @laundries = Laundry.all
  end

  # GET /laundries/1
  # GET /laundries/1.json
  def show
  end

  # GET /laundries/new
  def new
    @laundry = Laundry.new
  end

  # GET /laundries/1/edit
  def edit
  end

  # POST /laundries
  # POST /laundries.json
  def create
    @laundry = Laundry.new(laundry_params)

    respond_to do |format|
      if @laundry.save
        format.html { redirect_to @laundry, notice: 'Laundry was successfully created.' }
        format.json { render :show, status: :created, location: @laundry }
      else
        format.html { render :new }
        format.json { render json: @laundry.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /laundries/1
  # PATCH/PUT /laundries/1.json
  def update
    respond_to do |format|
      if @laundry.update(laundry_params)
        format.html { redirect_to @laundry, notice: 'Laundry was successfully updated.' }
        format.json { render :show, status: :ok, location: @laundry }
      else
        format.html { render :edit }
        format.json { render json: @laundry.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /laundries/1
  # DELETE /laundries/1.json
  def destroy
    @laundry.destroy
    respond_to do |format|
      format.html { redirect_to laundries_url, notice: 'Laundry was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_laundry
      @laundry = Laundry.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def laundry_params
      params.require(:laundry).permit(:name, :score, :address, :address_details, :city, :logo, :cover, :location)
    end
end
