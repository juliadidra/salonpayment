import Header from "./components/Header";
import ProductSection from "./components/ProductSection";

const Payment = () => {
    return (
        <main className="w-full min-h-screen h-full flex flex-col gap-5 p-4 py-[1.125rem]">
            <Header></Header>

            <h2 className="text-lg mt-5 text-zinc-600 font-medium">Produtos e Serviços</h2>

            <ProductSection></ProductSection>
        </main>
    );
}
 
export default Payment;