import { useEffect, useState } from "react"
import { deletar, listar } from "../../../services/Service"
import { useNavigate, useParams } from "react-router-dom"
import { RotatingLines } from "react-loader-spinner"
import type Produto from "../../../models/Produto"


function DeletarProduto() {

    const navigate = useNavigate()
 
    const [isLoading, setIsLoading] = useState<boolean>(false)
   
    const [produto, setProduto] = useState<Produto>({} as Produto)

    const { id } = useParams<{ id: string }>()

    async function listarProdutoPorid(id: string){
            try {
                await listar(`/produtos/${id}`, setProduto, {

                })

            } catch (error: any) {
                if(error.toString().includes("401")){
                    alert("Não listou os produtos!")
                }
            } 
    }

    useEffect(()=>{
        if (id !== undefined){
            listarProdutoPorid(id)
        }else{
            setProduto({
                id: undefined,
                nome: "",
                preco: 0,
                foto: "",
                curtir: 0,
                categoria: {
                  id: undefined,
                  tipo: ""
                }
            })
        }
    }, [id])

    async function deletarProduto() {
        setIsLoading(true)

        try {
            await deletar(`/produtos/${id}`, {

            })

            alert("Produto foi excluído com sucesso!")

        } catch (error: any) {
            {
                alert("Erro ao Excluir o produto!")
                console.error(error)
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar(){
        navigate("/produtos")
    }

    return (
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4'>Deletar Produto</h1>
            <p className='text-center font-semibold mb-4'>
                Você tem certeza de que deseja apagar o produto a seguir?</p>
            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header 
                    className='py-2 px-6 bg-indigo-600 text-white font-bold text-2xl'>
                    Produto
                </header>
                <p className='p-8 text-3xl bg-slate-200 h-full'>{produto.nome}</p>
                <div className="flex">
                    <button 
                        className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2'
                        onClick={retornar}
                        >
                        Não
                    </button>
                    <button 
                        className='w-full text-slate-100 bg-indigo-400 
                                   hover:bg-indigo-600 flex items-center justify-center'
                        onClick={deletarProduto}           
                        >
                        {isLoading ? 
                                <RotatingLines
                                    strokeColor="white"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    width="24"
                                    visible={true}
                                /> 
                                : 
                                <span>Sim, Quero Deletar!</span>
                        }                
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarProduto