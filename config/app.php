<?php

use Illuminate\Support\Facades\Facade;

return [
    'version' => 'canary',

    'aliases' => Facade::defaultAliases()->merge([
        // Custom Facades
        'Activity' => App\Facades\Activity::class,
        'LogBatch' => App\Facades\LogBatch::class,
        'LogTarget' => App\Facades\LogTarget::class,
    ])->toArray(),
];
