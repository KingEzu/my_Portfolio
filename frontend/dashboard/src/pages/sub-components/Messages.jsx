import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { Tabs } from '@radix-ui/react-tabs';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllMessages, clearAllMessageErrors, deleteMessage, resetMessagesSlice, deleteAllMessages } from '@/store/slices/messagesSlice';
import { toast } from 'react-toastify';
import SpecialLoadingButton from './SpecialLoadingButton';

const Messages = () => {
    
    

    const { messages, loading, error, message } = useSelector(
        (state) => state.messages  // Make sure `state.messages` contains `messages` array
    );

    const [messageId, setMessageId] = useState('');
    const dispatch = useDispatch();

    // Delete Message Handler
    const handleMessageDelete = (id) => {
        setMessageId(id);
        dispatch(deleteMessage(id)).then(() => {
            toast.success('Message deleted successfully!');
        }).catch((err) => {
            toast.error('Failed to delete message');
        });
    };

    useEffect(() => {
        /* Fetch all messages on component load
        dispatch(getAllMessages()).then(() => {
            console.log('Messages:', messages);  // Log the messages to check if they are being fetched correctly
        });*/
            const fetchMessages = async () => {
        await dispatch(getAllMessages());
    };
    
    fetchMessages();
}, [dispatch]);
    
     useEffect(() => {   // Handle errors
        if (error) {
            toast.error(error);
            dispatch(clearAllMessageErrors());
        }
    
        // Show success message and reset message state
        if (message) {
            //toast.success(message);
            dispatch(resetMessagesSlice());
            dispatch(getAllMessages()); // Optionally re-fetch the messages
        }
    }, [dispatch, error, message, loading]);
    
    

    const handleDeleteAllMessages = () => {
        dispatch(deleteAllMessages()).then(() => {
        toast.success("All messages deleted successfully!");
        }).catch((err) => {
           toast.error("Failed to delete all messages");
        });
    };
    
    return (
        <>
            <div className="min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-28">
                <Tabs>
                    <TabsContent>
                        <Card className="dark:bg-gray-800 dark:text-gray-100">
                            <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center dark:text-gray-100">
                                <CardTitle>Messages</CardTitle>
                             {messages.length > 0 ? (
                                        <Button className="w-fit" onClick={handleDeleteAllMessages}>
                                            Delete All Messages
                                        </Button>
                                    
                                ) : (
                                    <Button className="w-fit" disabled>
                                        Delete All Messages
                                    </Button>
                                )}

 

                            </CardHeader>
                            <CardContent className="grid sm:grid-cols-2 gap-4">
                            {messages && messages.length > 0 ? (
                                     messages.map((element) => (
                                         <Card key={element._id} className="grid gap-2 dark:text-gray-100">
                                            <CardDescription className="dark:text-gray-100">
                                                <span className="font-bold mr-2 dark:text-gray-100">Sender Name:</span>
                                                {element.SenderName}
                                            </CardDescription>
                                            <CardDescription>
                                                <span className="font-bold mr-2 dark:text-gray-100">Subject:</span>
                                                {element.subject }
                                            </CardDescription>
                                            <CardDescription>
                                                <span className="font-bold mr-2 dark:text-gray-100 block">Message:</span>
                                                {element.message}
                                            </CardDescription> 
                                            <CardFooter className="justify-end">
                                                {loading && messageId === element._id ? (
                                                    <SpecialLoadingButton content={ "Deleting..."}/>
                                                       
                                                 
                                                ) : (
                                                    <Button
                                                        className="w-32"
                                                        onClick={() => handleMessageDelete(element._id)}
                                                    >
                                                        Delete
                                                    </Button>
                                                )}
                                            </CardFooter>
                                        </Card>
                                    ))
                                ) : (
                                    <CardHeader>No Messages Found!</CardHeader>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
    

};

export default Messages;