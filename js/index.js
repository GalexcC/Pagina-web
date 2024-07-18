const productos=[];
const agregarProducto=(id, producto, precio)=>{
    let indice=productos.findIndex(p => p.id==id)
    if(indice!=-1){
        productos[indice].cantidad++;
        putJson(producto[indice])
    }else{
        postJson(
            {
                id: id,
                producto:producto,
                precio:precio,
                cantidad:1,
            })
            console.log(productos);
            actualizarTabla();
    }
}

async function putJson(data){
    try{
        const response=await fetch(`http://localhost:3000/productos/${data.id}`,{
    method:"PUT",
    headers:{
        "Content-Type":"application/json",
    },
    body:JSON.stringify(data),
    });
    const result=await response.json();
    console.log("Exitoso", result);
    }catch(error){
        console.log("Error", error);
    }
}

async function postJson(data){
    try{
        const response=await fetch(`http://localhost:3000/productos/`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(data),
            });
            const result=await response.json();
    console.log("Exitoso", result);
    }catch(error){
        console.log("Error", error);
    }
    }

const actualizarTabla = () =>{
    let tbody= document.getElementById('tbody');
    let total=0;
    tbody.innerHTML="";
    for(let item of productos){
        let fila=tbody.insertRow();
        let celdaProducto=fila.insertCell(0);
        let celdaCantidad=fila.insertCell(1);
        let celdaPrecio=fila.insertCell(2);
        let celdaTotal=fila.insertCell(3);
        let celdaBoton=fila.insertCell(4);
        celdaPrecio.textContent=item.precio;
        celdaCantidad.textContent=item.cantidad;
        celdaProducto.textContent=item.producto;
        celdaTotal.textContent=item.precio*item.cantidad;

        let boton=documento.createElement('button');
        boton.textContent='Borrar';
        celdaBoton.append(boton);
        boton.addEventListener("click", ()=> {
            eliminar(item.id);
        });
        total=total+item.precio*item.cantidad;
    }
    document.getElementById('total').textContent=total;

}
const eliminar=(id)=>{
    let indice=productos.findIndex(p =>  p.id ==id)
    console.log(indice);
    if(indice!=-1){
        productos.splice(indice, 1);
        actualizarTabla();
        deleteJson(id);
    }
}
async function deleteJson(data){
    try{
        const response=await fetch(`http://localhost:3000/productos/${data}`,{
            method:"DELETE",
            });
            const result=await response.json();
    console.log("Exitoso", result);
    }catch(error){
        console.log("Error", error);
    }
    }

    async function getJson(data){
        try{
            const response=await fetch(`http://localhost:3000/productos`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(data),
                });
                const result=await response.json();
        console.log("Exitoso", result);
        productos=result
        actualizarTabla();
        }catch(error){
            console.log("Error", error);
        }
    }
    window.onload=()=>{
        getJson();
    };

