import Header from "@/components/Header";
import Footer from "@/components/App/Footer";

const AppLayout = ({children})=>{

  return <>
    <Header/>
    {children}
    <Footer />
  </>
}

export default AppLayout