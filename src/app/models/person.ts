export interface Person{
    id_usuario: number;
    first_name:string,
    last_name:string,
    correo:string,
    contrasena:string 
    create_at: Date
    create_by: string
    id_rol: number  
}

export interface PersonLog{
    email:string,
    password:string 
}