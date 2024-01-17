

interface idProps {
    params: {
      id:  string
    }
 }

 export default function TesteTeste({params} : idProps) {
 
  return (
    <div>
      <h1 className='text-lg bg-red-700'>Parâmetro da URL: {params.id}</h1>
    </div>
  );
}
