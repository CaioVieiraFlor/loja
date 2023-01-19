import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";

@Injectable()
export class UsuarioRepository{
    private usuarios: UsuarioEntity[] = [];

    async salvar(usuario: UsuarioEntity){
        this.usuarios.push(usuario);
    }

    async listar(){
        return this.usuarios;
    }

    async existeComEmail(email: string){
        const possivelusuario = this.usuarios.find(
            usuario => usuario.email === email
        );

        return possivelusuario !== undefined;
    }

    private buscaPorId(id: string){
        const possivelusuario = this.usuarios.find(
            usuarioSalvo => usuarioSalvo.id == id
        );

        if(!possivelusuario){
            throw new Error('Usuário não existe');
        }

        return possivelusuario;
    }

    async atualiza(id: string, dadosDeAtualizacao: Partial<UsuarioEntity>){
        const usuario = this.buscaPorId;
        Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
            if(chave === 'id'){
                return;
            }

            usuario[chave] = valor;
        });

        return usuario;
    }

    async remove(id: string){
        const usuario = this.buscaPorId(id);
        this.usuarios = this.usuarios.filter(
            usuarioSalvo => usuarioSalvo.id !== id
        )

        return usuario;
    }
}