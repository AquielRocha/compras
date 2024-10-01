'use client';

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Leaf, Mail, Phone, MessageSquare } from 'lucide-react'

export default function Help() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [mensagem, setMensagem] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Lidar com o envio do formulário aqui
        console.log('Formulário enviado:', { nome, email, mensagem })
        // Resetar campos do formulário
        setNome('')
        setEmail('')
        setMensagem('')
    }

    return (
        <div className="min-h-screen bg-white text-green-900" style={{'--icmbio-green': '#00823B'} as React.CSSProperties}>
            <header className="bg-[var(--icmbio-green)] text-white p-4">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Leaf className="h-8 w-8" />
                        <span className="text-2xl font-bold">ICMBIO</span>
                    </div>
              
                </div>
            </header>

            <main className="container mx-auto mt-8 px-4">
                <h1 className="text-3xl font-bold mb-6 text-center">Centro de Suporte</h1>
                
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Perguntas Frequentes</h2>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Quais serviços o ICMBIO oferece?</AccordionTrigger>
                            <AccordionContent>
                                O ICMBIO oferece uma gama de serviços de conservação ambiental. Isso inclui a gestão de áreas protegidas, a realização de pesquisas e a implementação de programas de conservação. Por favor, substitua este texto por informações específicas sobre os serviços da sua organização.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Como posso relatar um problema ambiental?</AccordionTrigger>
                            <AccordionContent>
                                Para relatar um problema ambiental, você pode usar nosso sistema de relatório online ou entrar em contato com nosso escritório local. O processo geralmente envolve fornecer detalhes sobre o problema, sua localização e qualquer evidência de apoio. Substitua isso pelos seus procedimentos específicos de relatório.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Quais são os horários de visita das áreas protegidas?</AccordionTrigger>
                            <AccordionContent>
                                Os horários de visita das áreas protegidas variam dependendo da localização específica e da época do ano. Geralmente, a maioria das áreas está aberta do nascer ao pôr do sol. Por favor, verifique nosso site ou entre em contato com a área protegida específica para obter os horários exatos. Substitua isso pela sua política real de horários de visita.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Informações de Contato</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2">
                            <Mail className="h-5 w-5 text-[var(--icmbio-green)]" />
                            <span>aquiel.dias.terceirizado@icmbio.gov.br</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Phone className="h-5 w-5 text-[var(--icmbio-green)]" />
                            <span>+55 (61) 2028-9565</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <MessageSquare className="h-5 w-5 text-[var(--icmbio-green)]" />
                            <span>Chat disponível das 9h às 17h</span>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">Enviar um Ticket de Suporte</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="nome">Nome</Label>
                            <Input 
                                id="nome" 
                                value={nome} 
                                onChange={(e) => setNome(e.target.value)} 
                                placeholder="Seu nome" 
                                required 
                            />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input 
                                id="email" 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder="Seu email" 
                                required 
                            />
                        </div>
                        <div>
                            <Label htmlFor="mensagem">Mensagem</Label>
                            <Textarea 
                                id="mensagem" 
                                value={mensagem} 
                                onChange={(e) => setMensagem(e.target.value)} 
                                placeholder="Descreva seu problema ou pergunta" 
                                required 
                            />
                        </div>
                        <Button type="submit" className="bg-[var(--icmbio-green)] text-white hover:bg-green-700">
                            Enviar Ticket
                        </Button>
                    </form>
                </section>
            </main>

            <footer className="bg-[var(--icmbio-green)] text-white mt-12 py-6">
                <div className="container mx-auto text-center">
                    <p>&copy; 2024 DMAG. Todos os direitos reservados.</p>
                    <p className="mt-2">Projeto teste</p>
                </div>
            </footer>
        </div>
    )
}