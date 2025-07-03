import { useNavigate, useParams } from "react-router-dom";
import type Categoria from "../../../models/Categoria";
import type Produto from "../../../models/Produto";
import { useEffect, useState, type ChangeEvent } from "react";
import { atualizar, cadastrar, listar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";


function FormProduto() {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [categorias, setCategorias] = useState<Categoria[]>([])

  const [categoria, setCategoria] = useState<Categoria>({ id: 0, tipo: '', })
  const [produto, setProduto] = useState<Produto>({} as Produto)

  const { id } = useParams<{ id: string }>();

  async function listarProdutoPorId(id: string) {
    try {
      await listar(`/produtos/${id}`, setProduto, {
      })
    } catch (error: any) {
        if(error.toString().includes("401"))
            alert("Não listou os produtos!")
            console.error(error)
            retornar();
    }
  }

  async function listarCategoriaPorid(id: string){
    try {
        await listar(`/categorias/${id}`, setCategoria, {
        })
    } catch (error: any) {
        if(error.toString().includes("401"))
            alert("Não listou as categorias baseada no seu ID!")
            console.error(error)
            retornar();
    } 
   }

   async function listarCategorias() {
    try {
        await listar('/categorias', setCategorias, {
        })
    } catch (error: any) {
        if(error.toString().includes("401"))
            alert("Não listou todas as categorias!")
            console.error(error)
            retornar();
    }
   }

  useEffect(() => {
    listarCategorias()

    if (id !== undefined) {
        listarProdutoPorId(id)
    }
  }, [id])

  useEffect(() => {
    setProduto({
        ...produto,
        categoria: categoria,
    })
  }, [categoria])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
	
	const { type, value, name } = e.target
	let valor: string | number = value
	
	if (['number', 'range'].includes(type) || (!isNaN(Number(value)) && value !== '')) {
		const valorSemZeros = value.replace(/^0+(?!$)/, '') || '0'
		valor = parseFloat(Number(valorSemZeros).toFixed(2))
	}
	
	setProduto({
		...produto,
		[name]: valor,
		categoria: categoria,
	})
  }

  async function gerarNovoProduto(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    if (id !== undefined) {
      try {
        await atualizar(`/produtos`, produto, setProduto, {
        })
        alert('Produto atualizado com sucesso')

      } catch (error: any) {
        alert('Erro ao atualizar o Produto')
        console.error(error)
      }

    } else {
      try {
        await cadastrar(`/produtos`, produto, setProduto, {
        })
        alert('Produto cadastrado com sucesso')

      } catch (error: any) {
        alert('Erro ao cadastrar o Produto')
        console.error(error)
      }
    }

    setIsLoading(false)
    retornar();
  }

  function retornar() {
    navigate("/produtos")
  }

  const carregandoCategoria = categoria.tipo === '';

  return (
    <div className="container flex flex-col items-center justify-center mx-auto px-2 pt-4">
      <h1 className="text-3xl md:text-4xl text-center my-8">
        {id === undefined ? 'Cadastrar Produto' : 'Editar Produto'}
      </h1>

      <form className="w-full max-w-md md:max-w-1/2 flex flex-col gap-4 px-2"
        onSubmit={gerarNovoProduto}
      >
        <div className="flex flex-col gap-2 ">
          <label htmlFor="produto">Nome do Produto</label>
          <input
            type="text"
            placeholder="Adicione aqui o nome"
            name='nome'
            className="border-2 border-slate-700 rounded p-2 utral-800 text-base md:text-lg"
            required
            value={produto.nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col gap-2 ">
          <label htmlFor="produto">Preço do Produto</label>
          <input
            type="number"
            step=".01"
            placeholder="Adicione aqui o preço"
            name='preco'
            className="border-2 border-slate-700 rounded p-2 utral-800 text-base md:text-lg"
            required
            value=
            {
                produto.preco === 0 ||
                produto.preco === undefined
                    ? ''
                    : produto.preco
            }
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col gap-2 ">
          <label htmlFor="produto">Foto do Produto</label>
          <input
            type="text"
            placeholder="Adicione aqui a foto"
            name='foto'
            className="border-2 border-slate-700 rounded p-2 utral-800 text-base md:text-lg"
            required
            value={produto.foto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col gap-2">
            <p>Categoria do Produto</p>
                <select name="categoria" id="categoria" className='border p-2 border-slate-800 rounded'
                        onChange={(e) => listarCategoriaPorid(e.currentTarget.value)}
                >
                    <option value="" selected disabled>Selecione uma Categoria</option>

                    {categorias.map((categoria) => (
                        <>
                            <option value={categoria.id} >{categoria.tipo}</option>
                        </>
                    ))}
                </select>
        </div>

        <button
          className="rounded text-slate-100 bg-slate-400 
          hover:bg-slate-800 w-full md:w-1/2 py-2 mx-auto flex justify-center text-base md:text-lg"
          type="submit"
          disabled={carregandoCategoria}
        >
          {isLoading ?
            <ClipLoader
            color="#ffffff"
            size={24}
          />
            :
            <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
          }
        </button>
      </form>
    </div>
  );
}

export default FormProduto;