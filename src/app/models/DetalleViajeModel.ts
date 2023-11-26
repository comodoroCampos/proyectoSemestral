import { DestinoModel } from "./DestinoModel";
import { TipoViajeModel } from "./TipoViajeModel";
import { UsuarioModel } from "./UsuarioModel";
import { VehiculoModel } from "./VehiculoModel";

export interface DetalleViajeModel {
    
    id?: number;
    id_viaje: number;
    id_pasajero: number;
}