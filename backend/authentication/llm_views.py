from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from django.conf import settings

llm = ChatOpenAI(openai_api_key=settings.API_KEY)
def bill_summerizer(text):
    prompt = ChatPromptTemplate.from_messages([
        ('system','you are an expert in summerizing the medical bills and deposition along with informations like amounts, treatments under 100 words. nothing else'),
        ('user','{text}')
    ])

    chain = prompt | llm

    response = chain.invoke({'text':text})

    return(response.content)
# print(bill_summerizer('medicine: felixar price:2 dollars tax:10% = 0.1 dollars to total=2.1 dollars'))


from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate


def letter_generator(text):



    prompt = ChatPromptTemplate.from_messages([
        ('system','you are an expert in writing demand letter under 300 words based on the invoice bill only with details available no variables in letter. nothing else'),
        ('user','{text}')
    ])

    chain = prompt | llm

    response = chain.invoke({'text':text})

    return(response.content)
# print(letter_generator('medicine: felixar price:2 dollars tax:10% = 0.1 dollars to total=2.1 dollars'))

def chat(text):


    prompt = ChatPromptTemplate.from_messages([
        ('system','you are an obedient and kind question answering assistant for legal Advice. nothing else'),
        ('user','{text}')
    ])

    chain = prompt | llm

    response = chain.invoke({'text':text})

    return(response.content)
