import React, { useState } from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { useContext } from "react";
import { Context } from "../store/appContext.js"
import { Modal, Button,Form } from "react-bootstrap";



export const Home = () => {
	const { store, actions } = useContext(Context)
	const [showModal, setShowModal] = useState(false); 
	const [showEditModal, setShowEditModal] = useState(false); 
	const [contactToEdit, setContactToEdit] = useState(null); 
	const [formData, setFormData] = useState({ name: "", email: "", phone: "", address: "" })
	const [contactToDelete, setContactToDelete] = useState(null);
	const handleShowModal = (id) => {
		setContactToDelete(id);
		setShowModal(true);
	  };
	
	 
	  const handleCloseModal = () => {
		setShowModal(false);
		setContactToDelete(null);
	  };
	
	  
	  const handleConfirmDelete = () => {
		if (contactToDelete) {
		  actions.eliminarContact(contactToDelete);
		  handleCloseModal(); 
		}
	  };



	  const handleShowEditModal = (contact) => {
		setContactToEdit(contact);
		setFormData({
		  name: contact.name,
		  email: contact.email,
		  phone: contact.phone,
		  address: contact.address,
		});
		setShowEditModal(true);
	  };
	
	  // Función para cerrar el modal de edición
	  const handleCloseEditModal = () => {
		setShowEditModal(false);
		setContactToEdit(null);
		setFormData({ name: "", email: "", phone: "", address: "" });
	  };
	
	  // Función para manejar cambios en el formulario de edición
	  const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	  };
	
	  // Función para enviar los datos actualizados
	  const handleSubmitEdit = () => {
		if (contactToEdit) {
		  actions.actualizarContacto(contactToEdit.id, formData); // Llamar a la acción para actualizar el contacto
		  handleCloseEditModal(); // Cerrar el modal
		}
	  };


	return (
		<div className="container">
			<Link to="/demo">
				<button className="btn btn-success mb-3">Add a new contact</button>
			</Link>
			<ul className="list-group">

				{store.contacts?.map((contact) => {
					return (
						<li key={contact.id} className="card mb-3">
							<div className="card-body d-flex align-items-center">
								<img
									src={rigoImage}
									alt={contact.name}
									className="rounded-circle me-3"
									style={{ width: "40px", height: "40px" }}
								/>

								<div className="flex-grow-1 me-3">
									<h2 className="h5 mb-1">{contact.name}</h2>
									<p className="mb-1 text-muted">{contact.address}</p>
									<p className="mb-1 text-muted">{contact.phone}</p>
									<p className="mb-0 text-muted">{contact.email}</p>
									

								</div>
     
								<div className="d-flex gap-2">
									<button
										className="btn btn-warning btn-sm rounded-circle d-flex align-items-center justify-content-center"
										style={{ width: "40px", height: "40px" }}
										onClick={() => handleShowEditModal(contact)}
										
									>
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
											<path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
										</svg>
									</button>



									<button
										className="btn btn-danger btn-sm rounded-circle d-flex align-items-center justify-content-center"
										style={{ width: "40px", height: "40px" }}
										onClick={() => handleShowModal(contact.id)}
									>
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash2" viewBox="0 0 16 16">
											<path d="M14 3a.7.7 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225A.7.7 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2M3.215 4.207l1.493 8.957a1 1 0 0 0 .986.836h4.612a1 1 0 0 0 .986-.836l1.493-8.957C11.69 4.689 9.954 5 8 5s-3.69-.311-4.785-.793" />
										</svg>
									</button>
				  				</div>
							</div>
						</li>
					);
				})}
			</ul>


			<Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar este contacto?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>







	  <div>
     
      {/* Modal de edición */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar contacto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmitEdit}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>


		</div>


	)
};
