export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id

    console.log(id)

    return (
        <h1>Hola</h1>
    );
}