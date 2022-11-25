from api_secrets import API_KEY
import openai

openai.api_key = API_KEY

code = """
def dfs(graph, start_node):
 
    need_visited, visited = list(), list()
 

    need_visited.append(start_node)
    

    while need_visited:
 

        node = need_visited.pop()
        

        if node not in visited:
 

            visited.append(node)

            need_visited.extend(graph[node])
            
    return visited
"""

prompt1 = code + """Here's what the above code is doing:
"""
response1 = openai.Completion.create(
  model="text-curie-001",
  prompt=prompt1,
  max_tokens=1000,
  temperature=0
)

answer1 = response1["choices"][0]["text"]

prompt2 = """Translate this into Korean
""" + answer1 + "\n"

response2 = openai.Completion.create(
  model="text-davinci-002",
  prompt=prompt2,
  max_tokens=1000,
  temperature=0
)

answer2 = response2["choices"][0]["text"]

print(answer2)