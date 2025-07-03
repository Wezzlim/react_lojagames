import { useEffect, useState } from "react";
import type Produto from "../../../models/Produto";
import { listar } from "../../../services/Service";
import CardProduto from "../cardproduto/CardProduto";
import { DNA } from "react-loader-spinner";


function ListarProdutos() {

    const [produtos, setProdutos] = useState<Produto[]>([]);

    async function listarProdutos() {
        try {
            await listar('/produtos', setProdutos, {
            })

        } catch (error: any) {
            if (error.toString().includes('403'))
            alert('Não foi possivel listar os produtos')
        }
    }

    useEffect(() => {
        listarProdutos()
    }, [produtos.length])

    return (
        <>
            {produtos.length === 0 && (
                <DNA
                    visible={true}
                    height="200"
                    width="200"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper mx-auto"
                />
            )}
            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col mx-2">
                    <div className='container mx-auto my-4 
                        grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
                    >
                        {produtos.map((produto) => (
                            <CardProduto key={produto.id} produto={produto} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListarProdutos;