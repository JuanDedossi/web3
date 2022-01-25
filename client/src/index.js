const displayGreeting = async (toDo, contract) => {
  let length = await contract.methods.getLength().call()
  console.log(length)
  $('ul').empty()
  for (let i = 0; i < length; i++) {
    toDo = await contract.methods.getTask(i).call()
    console.log(toDo)
    $('ul').append(
      `<li id={${toDo[0]}}><label class="container" id="c3">${toDo[1]}
      <input type="checkbox" ${
        toDo[2] ? 'checked' : null
      } disabled >
      <span class="checkmark"></span>
    </label>
      </li>`
    )
    
  }
}
const updateGreeting = (toDo, contract, accounts) => {
  let input
  $('#input').on('change', e => {
    input = e.target.value
  })
  $('#form').on('submit', async e => {
    e.preventDefault()
    await contract.methods
      .addTask(input)
      .send({ from: accounts[0], gas: 400000 })
    $('#input').val('')
    displayGreeting(toDo, contract)
  })
}
const updateDone = (toDo, contract, accounts) => {
  let input
  $('#inputDone').on('change', e => {
    input = e.target.value
  })
  $('#done').on('submit', async e => {
    e.preventDefault()
    await contract.methods
      .doneTask(input -1)
      .send({ from: accounts[0], gas: 400000 })
    $('#inputDone').val('')
    displayGreeting(toDo, contract)
  })
}
async function greetingApp() {
  const web3 = await getWeb3()
  const accounts = await web3.eth.getAccounts()
  const contract = await getContract(web3)
  let toDo
  displayGreeting(toDo, contract)
  updateGreeting(toDo, contract, accounts)
  updateDone(toDo, contract, accounts)
}
greetingApp()
