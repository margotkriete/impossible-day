import os
import json

l = []

p_identifier = '<p id="description" juno-dtcp-info="Id:description;Role:label;" class="body" peggy-text-format="htmlify,truncate,collapseBreaks" data-truncate-length="300">'

for root, dirs, files in os.walk("./src/assets"):
    for dir in dirs:
        out_dict = {}
        if dir not in out_dict:
            out_dict["image"] = dir

        for file in os.listdir(f"./src/assets/{dir}"):
            if file.endswith(".json"):
                with open(f"./src/assets/{dir}/{file}") as f:
                    data = f.read()
                    creative = json.loads(data).get("creative", {})
                    out_dict["title"] = creative.get("headline")
                    out_dict["author"] = creative.get("subheadline").replace("By ", "")
            if file.endswith(".html"):
                with open(f"./src/assets/{dir}/{file}") as f:
                    data = f.read()
                    data = data.split(p_identifier)
                    if len(data) > 1:
                        out_dict["description"] = data[1].split("</p>")[0]

        if out_dict not in l:
            l.append(out_dict)

print(json.dumps(l))
