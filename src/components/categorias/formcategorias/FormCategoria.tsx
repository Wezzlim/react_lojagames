import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import type Categoria from '../../../models/Categoria'
import { useNavigate, useParams } from 'react-router-dom'
import { RotatingLines } from 'react-loader-spinner'
import { atualizar, cadastrar, listar } from '../../../services/Service'

function FormCategoria() {

    const navigate = useNavigate()
 
    const [isLoading, setIsLoading] = useState<boolean>(false)
   
    const [categoria, setCategoria] = useState<Categoria>({} as Categoria)

    const { id } = useParams<{ id: string }>()

    async function listarCategoriaPorid(id: string){
                try {
                    await listar(`/categorias/${id}`, setCategoria, {
    
                    })
    
                } catch (error: any) {
                    if(error.toString().includes("401")){
                        alert("Não listou as categorias!")
                    }
                } 
        }
    
    useEffect(()=>{
        if (id !== undefined){
            listarCategoriaPorid(id)
        }else{
            setCategoria({
                id: undefined,
                tipo: "",
            })
            }
    }, [id])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value,
        })
    }

    async function gerarNovaCategoria(e: FormEvent<HTMLFormElement>){

        e.preventDefault()
        setIsLoading(true)
        
        if (id !== undefined){
            try{
                await atualizar("/categorias", categoria, setCategoria, {
                })
 
                alert("A categoria foi atualizada com sucesso!")
            }catch(error: any){
                alert("Erro ao atualizar o categoria!")
                console.error(error)
            }
        }else{
                try{
                    await cadastrar("/categorias", categoria, setCategoria, {
                    })
     
                    alert("A categoria foi cadastrada com sucesso!")
                }catch(error: any){
                    alert("Erro ao cadastrar categoria!")
                    console.error(error)
                }
        }
     
        setIsLoading(false)
        retornar()
    }
    
    function retornar(){
        navigate("/categorias")
    }    

    return (
        <div className="container flex flex-col items-center justify-center mx-auto">
            <h1 className="text-4xl text-center my-8">
                {id === undefined ? "Cadastrar uma nova Categoria" : "Editar Categoria"}
            </h1>
 
            <form
                className="w-1/2 flex flex-col gap-4"
                onSubmit={gerarNovaCategoria}
            >
                <div className="flex flex-col gap-2">
                    <label htmlFor="tipo">Categoria</label>
                    <input
                        type="text"
                        placeholder="Descreva aqui sua categoria"
                        name='tipo'
                        className="border-2 border-slate-700 rounded p-2"
                        value={categoria.tipo}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <button
                    className="rounded text-slate-100 bg-indigo-400
                               hover:bg-indigo-800 w-1/2 py-2 mx-auto flex justify-center"
                    type="submit">
                   
                    {
                        isLoading ?
 
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        />
                        :
                        <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
                       
                    }
                   
                </button>
            </form>
        </div>
    );
}

export default FormCategoria;