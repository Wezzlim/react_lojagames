import { GithubLogo, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react"


function Footer() {
  return (
    <div className="
        bg-gray-100
        py-6
        md:py-9
        lg:py-12
        text-center">
        <p className="
        text-sm
        text-gray-600">
        © 2025 Feito por Wesley Lima, Todos os direitos reservados.
        </p>
        <div className="
            flex 
            justify-center 
            gap-6 mt-4">
            <a href="https://www.linkedin.com/in/wesleytecnologia/" target="_blank"> 
              <LinkedinLogo size={32} color="#01398e" /> 
            </a>
            <a href="https://github.com/Wezzlim" target="_blank">
              <GithubLogo size={32} color="#01398e" />
            </a>
            <a href="https://www.instagram.com/wesley_lima0/" target="_blank">
              <InstagramLogo size={32} color="#01398e" />
            </a>
        </div>
    </div>
  )
}

export default Footer