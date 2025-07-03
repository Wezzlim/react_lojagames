import ListarProdutos from "../../components/produtos/listaprodutos/ListarProdutos"
import ModalProduto from "../../components/produtos/modalproduto/ModalProduto"

function Home() {
  return (
    <>
    <div className="
        flex 
        justify-center
        bg-blue-900">

        <div className="
            container 
            grid 
            grid-cols-2
            text-white">

            <div className="
                flex
                flex-col
                justify-center
                items-center
                gap-4
                py-4
                ">
                <h2 className="
                    text-5xl 
                    font-bold">
                    Seja Bem Vindo!
                </h2>
                <p className="text-xl">Aqui você encontra os melhores Games</p>

                <div className="
                    flex
                    justify-around
                    gap-4">
                    <div className="
                    flex 
                    justify-around 
                    gap-4">
                        <ModalProduto />
                    </div>
                </div>
            </div>
            <div className="
                flex
                justify-center
                ">
                <img 
                    src="https://i.imgur.com/VpwApCU.png" 
                    alt="Imagem da Página Home"
                    className="w-2/3"
                />
            </div>
        </div>
    </div>
    <ListarProdutos />
    </>
  )
}

export default Home