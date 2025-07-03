import { useEffect, useState } from 'react'
import type Categoria from '../../../models/Categoria'
import { listar } from '../../../services/Service'
import { DNA } from 'react-loader-spinner'
import CardCategoria from '../cardcategorias/CardCategoria'

function ListarCategorias() {

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [categorias, setCategorias] = useState<Categoria[]>([])

    async function buscarCategorias(){
        try {
            
            setIsLoading(true)

            await listar("/categorias", setCategorias, {
            })

        } catch (error: any) {
            if(error.toString().includes("401")){
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        buscarCategorias()
    }, [categorias.length])

    return (
        <>
            {isLoading && (
                <DNA
                    visible={true}
                    height="200"
                    width="200"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper mx-auto"
                />
            )
                
            }
            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col">

                    {
                        (!isLoading && categorias.length) === 0 && (
                            <span className="text-3xl text-center my-8">
                                Nenhuma categoria foi encontrada!
                            </span>
                        )
                    }

                    <div className="grid grid-cols-1 md:grid-cols-2 
                                    lg:grid-cols-3 gap-8">
                        {
                            categorias.map((categoria) => (
                                <CardCategoria key={categoria.id} categoria={categoria}/>
                            ))                            
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListarCategorias