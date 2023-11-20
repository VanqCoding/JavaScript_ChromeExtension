let myLeads = []
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

function render(leads){
    let listItems = ""
    for (let i = 0; i < leads.length; i++) 
    {   
        const element = leads[i]
        listItems += `
                        <li>
                            <a href="${element}" target="_blank">${element}</a>
                        </li>
                    `
    }
    ulEl.innerHTML = listItems
}

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        if (!myLeads.includes(tabs[0].url))
        {
            myLeads.push(tabs[0].url)
            localStorage.setItem("myLeads", JSON.stringify(myLeads))
            render(myLeads)
        }
        else
        {
            alert("The link already exists in the list!")
        }
    })

    
})

inputBtn.addEventListener("click", function() {
    if (inputEl.value) 
    {
        if (!myLeads.includes(inputEl.value)) 
        {
            myLeads.push(inputEl.value)
            localStorage.setItem("myLeads", JSON.stringify(myLeads))
            render(myLeads);
        } 
        else 
        {
            alert("The link already exists in the list!")
        }
        inputEl.value = ""
    }
})

deleteBtn.addEventListener("dblclick", function()
{
    myLeads = []
    localStorage.clear()
    render(myLeads)
})