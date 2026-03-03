import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ScrollArea } from '../components/ui/scroll-area';
import { ArrowLeft, Send, Paperclip, Image, FileText, MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from '../components/ui/dropdown-menu';
export const ChatPage = () => {
    const { chatId } = useParams();
    const navigate = useNavigate();
    const { conversations, activities, currentUser, sendMessage, getMessagesForConversation, markConversationAsRead } = useApp();
    const [messageText, setMessageText] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);
    // Determine if it's a group chat
    const isGroupChat = chatId?.startsWith('activity-');
    // Get chat info
    let chatInfo = null;
    let messages = [];
    if (isGroupChat) {
        const activityId = chatId?.replace('activity-', '');
        const activity = activities.find(a => a.id === activityId);
        if (activity) {
            chatInfo = {
                id: chatId,
                title: activity.title,
                image: activity.imageUrl,
                participants: activity.currentParticipants,
                type: 'group',
            };
            // Mock messages for group chat
            messages = [
                {
                    id: '1',
                    senderId: 'user-org',
                    senderName: activity.organiserName,
                    senderAvatar: activity.organiserAvatar,
                    text: `Welcome everyone! Looking forward to ${activity.title}!`,
                    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
                    isCurrentUser: false,
                },
                {
                    id: '2',
                    senderId: 'user-2',
                    senderName: 'Jennifer Koh',
                    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
                    text: 'Hi everyone! Excited to join!',
                    timestamp: new Date(Date.now() - 1000 * 60 * 60),
                    isCurrentUser: false,
                },
                {
                    id: '3',
                    senderId: currentUser?.id,
                    senderName: currentUser?.name,
                    senderAvatar: currentUser?.avatar,
                    text: 'Hello! Can\'t wait!',
                    timestamp: new Date(Date.now() - 1000 * 60 * 30),
                    isCurrentUser: true,
                },
            ];
        }
    }
    else {
        const conversation = conversations.find(c => c.id === chatId);
        if (conversation) {
            chatInfo = conversation;
            messages = getMessagesForConversation(chatId);
        }
    }
    useEffect(() => {
        if (chatId) {
            markConversationAsRead(chatId);
        }
    }, [chatId]);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!messageText.trim() && !selectedFile)
            return;
        if (isGroupChat) {
            // In a real app, send to group chat
            console.log('Sending group message:', messageText, 'Anonymous:', isAnonymous);
        }
        else if (chatId) {
            sendMessage(chatId, messageText);
        }
        setMessageText('');
        setSelectedFile(null);
    };
    const handleFileSelect = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };
    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    };
    if (!chatInfo) {
        return (<div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-gray-500">Chat not found</p>
          <Button onClick={() => navigate('/messages')} className="mt-4">
            Back to Messages
          </Button>
        </div>
      </div>);
    }
    return (<div className="h-[calc(100vh-4rem)] flex flex-col bg-white">
      {/* Chat Header */}
      <div className="border-b p-4 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate('/messages')}>
          <ArrowLeft className="h-5 w-5"/>
        </Button>
        
        <img src={isGroupChat ? chatInfo.image : chatInfo.participantAvatar} alt={isGroupChat ? chatInfo.title : chatInfo.participantName} className="w-10 h-10 rounded-full object-cover"/>
        
        <div className="flex-1">
          <h2 className="font-semibold">
            {isGroupChat ? chatInfo.title : chatInfo.participantName}
          </h2>
          {isGroupChat && (<p className="text-xs text-gray-500">{chatInfo.participants} members</p>)}
        </div>

        {isGroupChat && (<DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5"/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsAnonymous(!isAnonymous)}>
                {isAnonymous ? '✓ ' : ''}Anonymous Mode
              </DropdownMenuItem>
              <DropdownMenuItem>View Activity Details</DropdownMenuItem>
              <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>)}
      </div>

      {/* Anonymous Mode Indicator */}
      {isAnonymous && isGroupChat && (<div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-sm text-amber-800 flex items-center gap-2">
          <span>🕵️</span>
          <span>Anonymous mode enabled - Your name and photo are hidden</span>
        </div>)}

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 max-w-3xl mx-auto">
          {messages.length === 0 ? (<div className="text-center py-12">
              <p className="text-gray-500">No messages yet</p>
              <p className="text-sm text-gray-400 mt-1">Start the conversation!</p>
            </div>) : (messages.map((message) => (<div key={message.id} className={`flex gap-2 ${message.isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
                {!message.isCurrentUser && (<img src={message.senderAvatar} alt={message.senderName} className="w-8 h-8 rounded-full object-cover flex-shrink-0"/>)}
                
                <div className={`flex flex-col ${message.isCurrentUser ? 'items-end' : 'items-start'} max-w-[70%]`}>
                  {!message.isCurrentUser && isGroupChat && (<span className="text-xs text-gray-600 mb-1 px-2">{message.senderName}</span>)}
                  <div className={`rounded-2xl px-4 py-2 ${message.isCurrentUser
                ? 'bg-[#5661f6] text-white'
                : 'bg-gray-100 text-gray-900'}`}>
                    <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1 px-2">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>)))}
          <div ref={messagesEndRef}/>
        </div>
      </ScrollArea>

      {/* File Preview */}
      {selectedFile && (<div className="border-t px-4 py-2 bg-gray-50 flex items-center gap-2">
          <FileText className="h-4 w-4 text-gray-600"/>
          <span className="text-sm flex-1">{selectedFile.name}</span>
          <Button variant="ghost" size="sm" onClick={() => setSelectedFile(null)}>
            Remove
          </Button>
        </div>)}

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="border-t p-4">
        <div className="flex items-end gap-2 max-w-3xl mx-auto">
          <div className="flex gap-1">
            <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileSelect} accept="image/*,.pdf,.doc,.docx"/>
            <Button type="button" variant="ghost" size="icon" onClick={() => fileInputRef.current?.click()} title="Attach file">
              <Paperclip className="h-5 w-5"/>
            </Button>
            <Button type="button" variant="ghost" size="icon" onClick={() => fileInputRef.current?.click()} title="Send image">
              <Image className="h-5 w-5"/>
            </Button>
          </div>
          
          <Input value={messageText} onChange={(e) => setMessageText(e.target.value)} placeholder={isAnonymous ? "Send anonymous message..." : "Type a message..."} className="flex-1"/>
          
          <Button type="submit" size="icon" className="bg-[#5661f6] hover:bg-[#4551e6]" disabled={!messageText.trim() && !selectedFile}>
            <Send className="h-5 w-5"/>
          </Button>
        </div>
      </form>
    </div>);
};
