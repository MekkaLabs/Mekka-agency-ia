# CRM Data Model - Mekka Labs

## Entidades principais

### users

- id
- name
- email
- role
- created_at

### leads

- id
- name
- company_name
- email
- phone
- source
- pain_point
- interest
- pipeline_stage
- next_action
- owner_id
- created_at
- updated_at

### companies

- id
- name
- segment
- size
- website
- status
- owner_id
- created_at

### contacts

- id
- company_id
- name
- role
- email
- phone
- is_primary

### deals

- id
- lead_id
- company_id
- offer_type
- value
- status
- expected_close_date
- created_at
- updated_at

### projects

- id
- company_id
- deal_id
- name
- type
- module
- status
- start_date
- due_date
- next_step

### tasks

- id
- project_id
- title
- status
- due_date
- owner_id

### notes

- id
- related_type
- related_id
- body
- author_id
- created_at

## Regras iniciais

- um lead pode virar uma company
- uma company pode ter varios contacts
- um lead ou company pode ter um deal
- um deal fechado gera um project
- um project pode ter varias tasks e notes

## Estado atual do MVP

- leads ja podem ser convertidos manualmente em `company`
- a conversao tambem pode abrir um `project` de `diagnostico`
- o dashboard do admin passa a ler leads e trabalhos reais do banco
- leads agora aceitam `notes` internas direto pela interface do CRM
- o CRM agora tem filtros e busca em leads, contas, trabalhos e pipeline
- deals agora existem como entidade operacional no admin e no schema SQL
