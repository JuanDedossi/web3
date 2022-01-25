const displayGreeting = async (greeting, contract) => {
  let length = await contract.methods.getLength().call()
  console.log(length)
  $('ul').empty()
  for (let i = 0; i < length; i++) {
    greeting = await contract.methods.getTask(i).call()
    console.log(greeting[2])
    $('ul').append(
      `<li id={${greeting[0]}}><label>${
        greeting[0]
      }</label><input type='checkbox' ${
        greeting[2] ? 'checked' : null
      } disabled /><label>${greeting[1]}</label></li>`
    )
  }
}
const updateGreeting = (greeting, contract, accounts) => {
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
    displayGreeting(greeting, contract)
  })
}
const updateDone = (greeting, contract, accounts) => {
  let input
  $('#inputDone').on('change', e => {
    input = e.target.value
  })
  $('#done').on('submit', async e => {
    e.preventDefault()
    await contract.methods
      .doneTask(input)
      .send({ from: accounts[0], gas: 400000 })
    $('#inputDone').val('')
    displayGreeting(greeting, contract)
  })
}
async function greetingApp() {
  const web3 = await getWeb3()
  const accounts = await web3.eth.getAccounts()
  const contract = await getContract(web3)
  let greeting
  displayGreeting(greeting, contract)
  updateGreeting(greeting, contract, accounts)
  updateDone(greeting, contract, accounts)
}
greetingApp()
