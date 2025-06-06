<?php

/**
 * Load services definition file.
 */
$settings['container_yamls'][] = __DIR__ . '/services.yml';

/**
 * Include the Pantheon-specific settings file.
 *
 * n.b. The settings.pantheon.php file makes some changes
 *      that affect all environments that this site
 *      exists in.  Always include this file, even in
 *      a local development environment, to ensure that
 *      the site settings remain consistent.
 */
include __DIR__ . "/settings.pantheon.php";

/**
 * Skipping permissions hardening will make scaffolding
 * work better, but will also raise a warning when you
 * install Drupal.
 *
 * https://www.drupal.org/project/drupal/issues/3091285
 */
// $settings['skip_permissions_hardening'] = TRUE;

/**
 * If there is a local settings file, then include it
 */
$local_settings = __DIR__ . "/settings.local.php";
if (file_exists($local_settings)) {
  include $local_settings;
}

$lando_app = getenv('LANDO_APP_NAME');

if (file_exists($app_root . '/' . $site_path . '/local.settings.php')) {
  include $app_root . '/' . $site_path . '/local.settings.php';
} elseif (!empty($lando_app) && file_exists($app_root . '/' . $site_path . '/lando.settings.php')) {
  include $app_root . '/' . $site_path . '/lando.settings.php';
}

/*  CHANGES LOCATION OF CONFIG DIRECTORY */
$settings['config_sync_directory'] = dirname(DRUPAL_ROOT) . '/config';