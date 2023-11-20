import { UsuarioModel } from "./UsuarioModel";

export interface VehiculoModel {

    id: number;
    marca_vehiculo: string;
    modelo_vehiculo: string;
    color_vehiculo: string;
    patente_vehiculo: string;
    usuario: number;
}