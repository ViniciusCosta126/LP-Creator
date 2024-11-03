<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class MakeBlock extends Command
{
    protected $signature = 'make:block {name}';
    protected $description = 'Cria um novo bloco funcional para a Landing Page';

    public function handle()
    {
        $name = $this->argument('name');

        // Caminhos para os arquivos
        $componentDirectory = resource_path("js/blocks/{$name}");
        $jsPath = "{$componentDirectory}/{$name}.jsx";
        $configPath = "{$componentDirectory}/config.json";
        $cssPath = "{$componentDirectory}/{$name}.css";

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
            'settings' => [
                'background_color' => '#ffffff',
                'text' => 'Exemplo de texto'
            ]
        ], JSON_PRETTY_PRINT));

        File::put($cssPath, "/* Estilos para o bloco {$name} */\n\n");

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
    const [settings, setSettings] = useState(config.settings);

    useEffect(() => {
        console.log('Configurações do bloco:', settings);
    }, [settings]);

    return (
        <div className="block-{$nameLower}" style={{ backgroundColor: settings.background_color }}>
            <p>{settings.text}</p>
        </div>
    );
};

export default {$name};
JS;
    }
}
