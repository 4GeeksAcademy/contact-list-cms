const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			
			contacts: [
				 
			],
			 
			
		},
		actions: { 
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
	    
			loadSomeData: () => {             
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
				fetch( "https://playground.4geeks.com/contact/agendas/matias/contacts")
				.then(res=>res.json())
				.then(data=> setStore({ contacts: data.contacts }))
			
    
			},
			createContact: (contactData) => {
				 console.log(contactData)
				fetch("https://playground.4geeks.com/contact/agendas/matias/contacts", {
				  method: "POST",
				  headers: { "Content-Type": "application/json" },
				  body: JSON.stringify(contactData),
				})
				  .then((res) => res.json())    
				  .then((data) => {
					// Actualizar el estado con el nuevo contacto
					const store = getStore();
					setStore({ contacts: [...store.contacts, data] });
					
					         
				  })
				  .catch((error) => console.error("Error creating contact:", error));
			  },
			  eliminarContact: (idContact) => {
				if (!idContact) {
					console.error("Invalid contact ID");
					return;
				}
			
				fetch(`https://playground.4geeks.com/contact/agendas/matias/contacts/${idContact}`, {
					method: "DELETE"
				})
				.then(async () => {
					const store = getStore();
					await setStore({ contacts: store.contacts.filter(item => item.id !== idContact) });
				})
				.catch((error) => {
					console.error("Error delete contact:", error);
					alert("Failed to delete contact. Please try again.");
				});
			},
			actualizarContacto: (id, updatedData) => {
				fetch(`https://playground.4geeks.com/contact/agendas/matias/contacts/${id}`, {
				  method: "PUT",
				  headers: {
					"Content-Type": "application/json",
				  },
				  body: JSON.stringify(updatedData),
				})
				  .then((response) => response.json())
				  .then((data) => {
					const store = getStore();
					// Actualizar el contacto en el estado
					const updatedContacts = store.contacts.map((contact) =>
					  contact.id === id ? { ...contact, ...updatedData } : contact
					);
					setStore({ contacts: updatedContacts });
				  })
				  .catch((error) => console.error("Error updating contact:", error))
				},

			
			changeColor: (index, color) => {
				//get the store 
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

			




			
		}
	};
}; 

export default getState;
