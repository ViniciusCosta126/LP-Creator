<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class MakeBlock extends Command
{
    protected $signature = 'make:block {name} {categoria}';
    protected $description = 'Cria um novo bloco funcional para a Landing Page';
    protected $allowedCategories = ['atomo', 'celula', 'organismo'];

    public function handle()
    {
        $name = $this->argument('name');
        $categoria = $this->argument('categoria');

        if (!in_array($categoria, $this->allowedCategories)) {
            $this->error("A categoria '{$categoria}' não é válida. Escolha entre: " . implode(', ', $this->allowedCategories));
            return;
        }

        $componentDirectory = resource_path("js/blocks/{$categoria}/{$name}");
        $jsPath = "{$componentDirectory}/{$name}.jsx";
        $configPath = "{$componentDirectory}/config.json";
        $cssPath = "{$componentDirectory}/{$name}.css";
        $componentesPath = resource_path('js/componentes.json');

        if (!File::exists($componentDirectory)) {
            File::makeDirectory($componentDirectory, 0755, true);
        }

        if (File::exists($jsPath) || File::exists($configPath) || File::exists($cssPath)) {
            $this->error("O bloco {$name} já existe!");
            return;
        }

        File::put($jsPath, $this->getBlockJavaScript($name));
        File::put($configPath, json_encode([
            'title' => "{$name} Block",
            'categoria' => "{$categoria}",
            'atributos' => [
                'background_color' => [
                    "tipo" => "color",
                    "default" => "#fff"
                ],
                'text' => [
                    "tipo" => "text",
                    "default" => "Teste de texto"
                ]
            ]
        ], JSON_PRETTY_PRINT));

        File::put($cssPath, "/* Estilos para o bloco {$name} */\n\n");

        // Adiciona o componente ao componentes.json
        $this->addComponentToJson($name, "./blocks/$categoria/$name/$name.jsx");

        $this->info("Bloco {$name} criado com sucesso!");
    }

    private function getBlockJavaScript($name)
    {
        $nameLower = strtolower($name);

        return <<<JS
import React, { useEffect, useState } from 'react';
import './{$name}.css';
import config from './config.json';

const {$name} = () => {
    const [settings, setSettings] = useState(config.atributos);

    useEffect(() => {
    
    }, [settings]);

    return (
        <div className="{$nameLower}" style={{ backgroundColor: settings.background_color.default }}>
            <p>{settings.text.default}</p>
        </div>
    );
};

export default {$name};
JS;
    }

    private function addComponentToJson($name, $path)
    {
        $componentesPath = resource_path('js/componentes.json');

        if (File::exists($componentesPath)) {
            $componentes = json_decode(File::get($componentesPath), true);
        } else {
            $componentes = [];
        }

        $componentes[] = [
            'name' => $name,
            'path' => $path
        ];

        // Salva o array de volta no arquivo componentes.json
        File::put($componentesPath, json_encode($componentes, JSON_PRETTY_PRINT));
    }
}
