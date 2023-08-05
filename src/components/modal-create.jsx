import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    Center,
    Input,
    Img,
  } from '@chakra-ui/react'
  import '../components/style.css'

  import api from '../json-server/api'
import { useEffect, useState } from 'react'
import imageDefault from '../components/asserts/default-image.jpg'
export const ModalCreate = ({isOpen, onClose, events, setEvents, id}) => {

   
    
    console.log('INi temp', temp)
    const submitCreate = () => {
       
        setEvents(events)
    }

    const inputHandler = (e) =>{
        if(e.target.id == 'price'){
                const price = e.target.value.replace(/[,.]/g, "");
                if(isNaN(price)) return setEvents({...events, [e.target.id] : 0})
            else {
                return setEvents({
                    ...events,
                    [e.target.id]: price,
                })
            }
        }    
        setEvents({
            ...events,
                [e.target.id] : e.target.value
        })
    
    }

    const clear = () => {
        setEvents({
            id: "",
            photo: "",
            name: "",
            location: "",
            date: "",
            time: "",
            description: "",
            ticketcategory: "",
            price: "",
            stock: ""
        })
      
        
    }
    
  useEffect(() => {

   
  },[] )
    return (
        
              <>
                  <Modal isOpen={isOpen} onClose={onClose} >
                    <ModalOverlay />
                    <ModalContent maxW='900px' alignItems={'center'}>
                    <ModalHeader>Input your event here</ModalHeader>
                    <ModalBody alignItems={'center'}>
                      <Img width={"900px"}
                             height={"400px"} mb={'20px'} style={{width:'100%', height:'100%'}} src={events?.photo? events?.photo : imageDefault}></Img>
                      <Input id='photo' placeholder='Image URL' mb={'20px'} onChange={inputHandler} defaultValue={events?.photo}></Input>
                      <Input id='name' placeholder='Name event' mb={'20px'} onChange={inputHandler} ></Input>
                      <Input id='description' placeholder='Description event' mb={'20px'} onChange={inputHandler}></Input>
                      <Input id='date' placeholder='Date' mb={'20px'} onChange={inputHandler}></Input>
                      <Input id='time' placeholder='Time' mb={'20px'} onChange={inputHandler}></Input>
                      <Input id='location' placeholder='Location event' mb={'20px'} onChange={inputHandler}></Input>
                      <Input id='ticketcategory' placeholder='Categori Event' mb={'20px'} onChange={inputHandler}></Input>
                      <Input id='price' placeholder='Price' mb={'20px'} onChange={inputHandler}></Input>
                      <Input id='stock' placeholder='Stock' mb={'20px'} onChange={inputHandler}></Input>
                     
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button variant='ghost' onClick={submitCreate}>Submit</Button>
                    </ModalFooter>
                    </ModalContent>
      </Modal>      
              </>
            
          
    )
}