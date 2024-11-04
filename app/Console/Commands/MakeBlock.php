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
        $cssPath = "{$componentDirectory}/{$name}.module.css";
        $barConfigPath = "{$componentDirectory}/BarConfig.jsx";
        $componentesPath = resource_path('js/componentes.json');

        if (!File::exists($componentDirectory)) {
            File::makeDirectory($componentDirectory, 0755, true);
        }

        if (File::exists($jsPath) || File::exists($configPath) || File::exists($cssPath) || File::exists($barConfigPath)) {
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
                    "default" => "#9d50ff"
                ],
                'text' => [
                    "tipo" => "text",
                    "default" => "Teste de texto"
                ]
            ]
        ], JSON_PRETTY_PRINT));
        File::put($cssPath, "/* Estilos para o bloco {$name} */\n\n");
        File::put($barConfigPath, $this->getBarConfigJavaScript());

        // Adiciona o componente ao componentes.json
        $this->addComponentToJson($name, "./blocks/$categoria/$name/$name.jsx", $categoria);

        $this->info("Bloco {$name} criado com sucesso!");
    }

    private function getBlockJavaScript($name)
    {
        $nameLower = strtolower($name);

        return <<<JS
import React, { useEffect, useState } from 'react';
import styles from './{$name}.module.css';
import config from './config.json';
import BarConfig from './BarConfig';

const {$name} = () => {
    const [settings, setSettings] = useState(config.atributos);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
    
    }, [settings]);

    return (
        <div className="{$nameLower}" style={{ backgroundColor: settings.background_color.default }} onClick={()=>setIsOpen(true)}>
            <p>{settings.text.default}</p>
            <BarConfig setSettings={setSettings} settings={settings} isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    );
};

export default {$name};
JS;
    }

    private function getBarConfigJavaScript()
    {
        return <<<JS
import React from "react";
import { MdClose } from "react-icons/md";

const BarConfig = ({ setSettings, settings, isOpen, setIsOpen }) => {
    function closeModal(e) {
        e.stopPropagation();
        setIsOpen(false);
    }

    const handleSettings = (e, key) => {
        const newSettings = {
            ...settings,
            [key]: {
                ...settings[key],
                default: e.target.value,
            },
        };
        setSettings(newSettings);
    };

    if (!isOpen) return null;

    return (
        <div className="bar-config show">
            <h2>Ajuste as configurações do seu componente</h2>
            <button onClick={closeModal}>
                <MdClose />
            </button>
            <form>
                {Object.keys(settings).map((key) => (
                    <div key={key}>
                        <label htmlFor={key}>{key}</label>
                        <input
                            type={settings[key].tipo}
                            value={settings[key].default}
                            onChange={(e) => handleSettings(e, key)}
                        />
                    </div>
                ))}
            </form>
        </div>
    );
};

export default BarConfig;

JS;
    }

    private function addComponentToJson($name, $path, $categoria)
    {
        $componentesPath = resource_path('js/componentes.json');

        if (File::exists($componentesPath)) {
            $componentes = json_decode(File::get($componentesPath), true);
        } else {
            $componentes = [];
        }

        $componentes[] = [
            'name' => $name,
            'categoria' => $categoria,
            'path' => $path
        ];

        File::put($componentesPath, json_encode($componentes, JSON_PRETTY_PRINT));
    }
}
