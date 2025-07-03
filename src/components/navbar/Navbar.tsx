import { Link } from "react-router-dom"

function Navbar() {

  return (
    <div className="
        flex 
        justify-center 
        w-full 
        p-4 
        text-gray-600 
        bg-gray-100">
        <div className="
            container 
            flex 
            justify-between 
            text-lg">
            <Link to="/home" className="text-2xl fonte-bold"> Loja de Games </Link>
                <div className="
                    flex
                    gap-4">
                    <Link to='/produtos' className='text-2xl fonte-bold hover:underline'>Produtos |</Link>  
                    <Link to='/cadastrarproduto' className="text-2xl fonte-bold hover:underline">Cadastrar Produto |</Link>
                    <Link to='/categorias' className="text-2xl fonte-bold hover:underline">Categorias |</Link>
                    <Link to='/cadastrarcategoria' className="text-2xl fonte-bold hover:underline">Cadastrar Categoria</Link>
                </div>
        </div>
    </div>
  )
}

export default Navbar