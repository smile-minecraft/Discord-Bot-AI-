class Plugin {

    constructor(name,spigot_id,URL,plugin_id,version) {
      this.name = name;
      this.spigot_id = spigot_id;
      this.URL = URL;
      this.plugin_id = plugin_id;
      this.version = version;
    }

    getName() {
      return this.name;
    }

    getSpigotID() {
      return this.spigot_id;
    }

    getURL() {
      return this.URL;
    }

    getPluginID() {
      return this.plugin_id;
    }

    getVersion() {
      return this.version;
    }

    setName(name) {
      this.name = name;
    }

    setSpigotID(spigot_id) {
      this.spigot_id = spigot_id;
    }

    setURL(URL) {
      this.URL = URL;
    }

    setPluginID(plugin_id) {
      this.plugin_id = plugin_id;
    }

    setVersion(version) {
      this.version = version;
    }

  }

  module.exports = Plugin;