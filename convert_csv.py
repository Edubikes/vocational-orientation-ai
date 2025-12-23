import pandas as pd
import json

df = pd.read_csv('../carreras_db.csv')

careers = []
for _, row in df.iterrows():
    style_scores = {}
    for col in df.columns[4:]: # Styles start at column 4
        style_scores[col] = int(row[col])
        
    careers.append({
        "name": row['Nombre'],
        "description": row['Descripción Breve'],
        "salary": row['Sueldo Promedio MXN'],
        "universities": row['Universidades en México'],
        "weights": style_scores
    })

ts_content = "import { CognitiveStyle } from './questions';\n\n"
ts_content += "export interface Career {\n"
ts_content += "  name: string;\n"
ts_content += "  description: string;\n"
ts_content += "  salary: string;\n"
ts_content += "  universities: string;\n"
ts_content += "  weights: Record<CognitiveStyle, number>;\n"
ts_content += "}\n\n"
ts_content += "export const careers: Career[] = " + json.dumps(careers, indent=2, ensure_ascii=False) + ";"

with open('lib/careers.ts', 'w') as f:
    f.write(ts_content)

print("Created lib/careers.ts successfully")
