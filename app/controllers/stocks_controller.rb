class StocksController < ApplicationController
  before_action :set_stock, only: [:show, :edit, :update, :destroy]

  # GET /stocks
  # GET /stocks.json
  def index
 
    
    case query_type
      when "drop"
        # Para consultas de retiro, filtrar por fechas mayores o iguales a AHORA.
        futuro_lejano = Time.now + 720.day
        @stocks = Stock.where(:laundry_id => laundry_id, :init_hour => ((Time.now)..futuro_lejano), :delivery_type => "drop")
        @carriers = Carrier.select("id, name")
      when "delivery"
         # Para consultas de entrega, sumar al producto los días de lavado y filtrar
         futuro_lejano = Time.now + 720.day
         if demora.to_i > 0
          minima_entrega = Time.now + demora.to_i.day
         else
          minima_entrega = Time.now + 35.day
         end
         @stocks = Stock.where(:laundry_id => laundry_id, init_hour: (minima_entrega ..futuro_lejano), :delivery_type => "delivery")
      else
        puts "Consulta con parámetro inválido"
        @stocks = Stock.all
    end
      

  end

  # GET /stocks/1
  # GET /stocks/1.json
  def show
  end

  # GET /stocks/new
  def new
    @stock = Stock.new
  end

  # GET /stocks/1/edit
  def edit
  end

  # POST /stocks
  # POST /stocks.json
  def create
    @stock = Stock.new(stock_params)

    respond_to do |format|
      if @stock.save
        format.html { redirect_to @stock, notice: 'Stock was successfully created.' }
        format.json { render :show, status: :created, location: @stock }
      else
        format.html { render :new }
        format.json { render json: @stock.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /stocks/1
  # PATCH/PUT /stocks/1.json
  def update
    respond_to do |format|
      if @stock.update(stock_params)
        format.html { redirect_to @stock, notice: 'Stock was successfully updated.' }
        format.json { render :show, status: :ok, location: @stock }
      else
        format.html { render :edit }
        format.json { render json: @stock.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /stocks/1
  # DELETE /stocks/1.json
  def destroy
    @stock.destroy
    respond_to do |format|
      format.html { redirect_to stocks_url, notice: 'Stock was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_stock
      @stock = Stock.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def stock_params
      params.require(:stock).permit(:laundry_id, :carrier_id, :init_hour, :ending_hour, :available, :remaining, :delivery_type)
    end
    def query_type
      params[:query_type].to_s
    end
    def laundry_id
      params[:laundry_id].to_i
    end
    def demora
      params[:demora]
    end
  end
