import { DestinoModel } from "./DestinoModel";
import { TipoViajeModel } from "./TipoViajeModel";
import { UsuarioModel } from "./UsuarioModel";
import { VehiculoModel } from "./VehiculoModel";

export interface ViajeModel {
    
    id: number;
    precio: number;
    nro_viaje: number;
    cant_asientos: number;
    calificacion: number;
    comentario: string;
    tipo_viaje: number;
    id_conductor: number;
    id_vehiculo: number;
    origen: string;
    coordenadas_origen: string;
    direccion: string;
    latitud: number;
    longitud: number;
    activo: boolean;
}