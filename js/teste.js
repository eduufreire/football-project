const btnListar = document.getElementById('listar')
btnListar.addEventListener("click", ()=>{

  var query = location.search.slice(1)
  var values = query.split('=')
  console.log(values)

})